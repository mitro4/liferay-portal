package com.liferay.portal.upgrade.v6_2_0_re;

import com.liferay.portal.kernel.dao.db.DB;
import com.liferay.portal.kernel.dao.db.DBFactoryUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.upgrade.UpgradeProcess;

public class UpgradeNameSize extends UpgradeProcess {
    private static final Log log = LogFactoryUtil.getLog(UpgradeNameSize.class.getName());

    @Override
    protected void doUpgrade() throws Exception {
        log.debug("Upgrading organization and user group names lenght");

        DB db = DBFactoryUtil.getDB();

        String query = "alter table Organization_ "
                + ((DB.TYPE_SQLSERVER.equals(db.getType()) || DB.TYPE_POSTGRESQL.equals(db.getType()) || DB.TYPE_HYPERSONIC.equals(db.getType())) ? "alter" : "modify")
                + " column name " + (DB.TYPE_POSTGRESQL.equals(db.getType()) ? "type" : "" ) + " varchar(255)";

        log.debug(query);
        runSQL(query);

        query = "alter table UserGroup "
                + ((DB.TYPE_SQLSERVER.equals(db.getType()) || DB.TYPE_POSTGRESQL.equals(db.getType())|| DB.TYPE_HYPERSONIC.equals(db.getType())) ? "alter" : "modify")
                + " column name " + (DB.TYPE_POSTGRESQL.equals(db.getType()) ? "type" : "" ) + " varchar(255)";
        
        log.debug(query);
        runSQL(query);
    }

}
