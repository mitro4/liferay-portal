/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.workflow.kaleo.model;

import aQute.bnd.annotation.ProviderType;

import com.liferay.portal.kernel.annotation.ImplementationClassName;
import com.liferay.portal.kernel.util.Accessor;
import com.liferay.portal.model.PersistedModel;

/**
 * The extended model interface for the KaleoCondition service. Represents a row in the &quot;KaleoCondition&quot; database table, with each column mapped to a property of this class.
 *
 * @author Brian Wing Shun Chan
 * @see KaleoConditionModel
 * @see com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionImpl
 * @see com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionModelImpl
 * @generated
 */
@ImplementationClassName("com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionImpl")
@ProviderType
public interface KaleoCondition extends KaleoConditionModel, PersistedModel {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this interface directly. Add methods to {@link com.liferay.portal.workflow.kaleo.model.impl.KaleoConditionImpl} and rerun ServiceBuilder to automatically copy the method declarations to this interface.
	 */
	public static final Accessor<KaleoCondition, Long> KALEO_CONDITION_ID_ACCESSOR =
		new Accessor<KaleoCondition, Long>() {
			@Override
			public Long get(KaleoCondition kaleoCondition) {
				return kaleoCondition.getKaleoConditionId();
			}

			@Override
			public Class<Long> getAttributeClass() {
				return Long.class;
			}

			@Override
			public Class<KaleoCondition> getTypeClass() {
				return KaleoCondition.class;
			}
		};
}