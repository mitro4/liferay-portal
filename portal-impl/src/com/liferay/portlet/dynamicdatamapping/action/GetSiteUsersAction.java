package com.liferay.portlet.dynamicdatamapping.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.ContentTypes;
import com.liferay.portal.kernel.util.OrderByComparator;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.kernel.workflow.WorkflowConstants;
import com.liferay.portal.kernel.servlet.ServletResponseUtil;
import com.liferay.portal.model.User;
import com.liferay.portal.service.GroupLocalServiceUtil;
import com.liferay.portal.service.UserLocalServiceUtil;
import com.liferay.portal.theme.ThemeDisplay;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class GetSiteUsersAction extends Action
{
	@Override
	public ActionForward execute(
			ActionMapping actionMapping, ActionForm actionForm,
			HttpServletRequest request, HttpServletResponse response) throws Exception
	{
		try {
		ThemeDisplay themeDisplay = (ThemeDisplay)request.getAttribute(WebKeys.THEME_DISPLAY);

		int start = 0;
		int end = 10;
		long groupId = ParamUtil.get(request, "groupId", themeDisplay.getScopeGroupId());
		Locale locale = request.getLocale();
		String searchQuery = ParamUtil.get(request, "inputVal", "").toLowerCase(locale);

		List<User> findedUsers  = UserLocalServiceUtil.search(themeDisplay.getCompanyId(), searchQuery,
											WorkflowConstants.STATUS_APPROVED, (LinkedHashMap<String, Object>)null,
											start, end, (OrderByComparator)null);

		JSONArray jsonArray = JSONFactoryUtil.createJSONArray();
		for (int i = 0; i < findedUsers.size(); i++)
		{
			User user = findedUsers.get(i);
			JSONObject jsonObject = JSONFactoryUtil.createJSONObject();

			String firstName = user.getFirstName().toLowerCase(locale);
			String screenName = user.getScreenName().toLowerCase(locale);
			String emailAddress = user.getEmailAddress().toLowerCase(locale);

			if ( ((firstName.indexOf(searchQuery) > -1 )
					|| (screenName.indexOf(searchQuery) > -1)
					|| (emailAddress.indexOf(searchQuery) > -1)) &&  GroupLocalServiceUtil.hasUserGroup(user.getUserId(), groupId) )
			{
				jsonObject.put("firstName", user.getFirstName());
				jsonObject.put("screenName", user.getScreenName());
				jsonObject.put("emailAddress", user.getEmailAddress());
				jsonObject.put("userId", user.getUserId());
				jsonArray.put(jsonObject);
			}
		}

		response.setContentType(ContentTypes.APPLICATION_JSON);
		response.setCharacterEncoding("UTF-8");
		response.setStatus(HttpServletResponse.SC_OK);
		ServletResponseUtil.write(response, jsonArray.toString());
		}
		catch (Exception e) {
			JSONObject jsonObject = JSONFactoryUtil.createJSONObject();

			jsonObject.putException(e);

			ServletResponseUtil.write(response, jsonObject.toString());
		}
		return null;
	}
}
