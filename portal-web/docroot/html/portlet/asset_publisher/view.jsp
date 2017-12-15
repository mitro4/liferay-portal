<%--
/**
 * Copyright (c) 2000-2013 Liferay, Inc. All rights reserved.
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
--%>

<%@ include file="/html/portlet/asset_publisher/init.jsp" %>

<%
if (mergeUrlTags || mergeLayoutTags) {
	String[] compilerTagNames = new String[0];

	if (mergeUrlTags) {
		compilerTagNames = ParamUtil.getParameterValues(request, "tags");
	}

	if (mergeLayoutTags) {
		Set<String> layoutTagNames = AssetUtil.getLayoutTagNames(request);

		if (!layoutTagNames.isEmpty()) {
			compilerTagNames = ArrayUtil.append(compilerTagNames, layoutTagNames.toArray(new String[layoutTagNames.size()]));
		}
	}

	String titleEntry = null;

	if (ArrayUtil.isNotEmpty(compilerTagNames)) {
		String[] newAssetTagNames = ArrayUtil.append(allAssetTagNames, compilerTagNames);

		allAssetTagNames = ArrayUtil.distinct(newAssetTagNames, new StringComparator());

		long[] allAssetTagIds = AssetTagLocalServiceUtil.getTagIds(siteGroupIds, allAssetTagNames);

		assetEntryQuery.setAllTagIds(allAssetTagIds);

		titleEntry = compilerTagNames[compilerTagNames.length - 1];
	}

	String portletTitle = portletDisplay.getTitle();

	portletTitle = AssetUtil.substituteTagPropertyVariables(scopeGroupId, titleEntry, portletTitle);

	renderResponse.setTitle(portletTitle);
}
else {
	allAssetTagNames = ArrayUtil.distinct(allAssetTagNames, new StringComparator());
}

for (String curAssetTagName : allAssetTagNames) {
	try {
		AssetTag assetTag = AssetTagLocalServiceUtil.getTag(scopeGroupId, curAssetTagName);

		AssetTagProperty journalTemplateIdProperty = AssetTagPropertyLocalServiceUtil.getTagProperty(assetTag.getTagId(), "journal-template-id");

		String journalTemplateId = journalTemplateIdProperty.getValue();

		request.setAttribute(WebKeys.JOURNAL_TEMPLATE_ID, journalTemplateId);

		break;
	}
	catch (NoSuchTagException nste) {
	}
	catch (NoSuchTagPropertyException nstpe) {
	}
}

if (enableTagBasedNavigation && selectionStyle.equals("manual") && ((assetEntryQuery.getAllCategoryIds().length > 0) || (assetEntryQuery.getAllTagIds().length > 0))) {
	selectionStyle = "dynamic";
}

Group scopeGroup = themeDisplay.getScopeGroup();

boolean hasAddPortletURLs = false;
%>

<c:if test="<%= showAddContentButton && (scopeGroup != null) && (!scopeGroup.hasStagingGroup() || scopeGroup.isStagingGroup()) && !portletName.equals(PortletKeys.HIGHEST_RATED_ASSETS) && !portletName.equals(PortletKeys.MOST_VIEWED_ASSETS) && !portletName.equals(PortletKeys.RELATED_ASSETS) %>">

	<%
	for (long groupId : groupIds) {
		addPortletURLs = AssetUtil.getAddPortletURLs(liferayPortletRequest, liferayPortletResponse, groupId, classNameIds, classTypeIds, allAssetCategoryIds, allAssetTagNames, null);

		if ((addPortletURLs != null) && !addPortletURLs.isEmpty()) {
			hasAddPortletURLs = true;
		}
	%>

		<div class="lfr-meta-actions add-asset-selector">
			<%@ include file="/html/portlet/asset_publisher/add_asset.jspf" %>
		</div>

	<%
	}
	%>

</c:if>

<div class="subscribe-action">
	<c:if test="<%= !portletName.equals(PortletKeys.HIGHEST_RATED_ASSETS) && !portletName.equals(PortletKeys.MOST_VIEWED_ASSETS) && !portletName.equals(PortletKeys.RECENT_CONTENT) && !portletName.equals(PortletKeys.RELATED_ASSETS) && PortletPermissionUtil.contains(permissionChecker, plid, portletDisplay.getId(), ActionKeys.SUBSCRIBE) && AssetPublisherUtil.getEmailAssetEntryAddedEnabled(portletPreferences) %>">
		<c:choose>
			<c:when test="<%= AssetPublisherUtil.isSubscribed(themeDisplay.getCompanyId(), user.getUserId(), themeDisplay.getPlid(), portletDisplay.getId()) %>">
				<portlet:actionURL var="unsubscribeURL">
					<portlet:param name="struts_action" value="/asset_publisher/edit_subscription" />
					<portlet:param name="<%= Constants.CMD %>" value="<%= Constants.UNSUBSCRIBE %>" />
					<portlet:param name="redirect" value="<%= currentURL %>" />
				</portlet:actionURL>

				<liferay-ui:icon
					image="unsubscribe"
					label="<%= true %>"
					url="<%= unsubscribeURL %>"
				/>
			</c:when>
			<c:otherwise>
				<portlet:actionURL var="subscribeURL">
					<portlet:param name="struts_action" value="/asset_publisher/edit_subscription" />
					<portlet:param name="<%= Constants.CMD %>" value="<%= Constants.SUBSCRIBE %>" />
					<portlet:param name="redirect" value="<%= currentURL %>" />
				</portlet:actionURL>

				<liferay-ui:icon
					image="subscribe"
					label="<%= true %>"
					url="<%= subscribeURL %>"
				/>
			</c:otherwise>
		</c:choose>
	</c:if>

	<c:if test="<%= enableRSS %>">
		<liferay-portlet:resourceURL varImpl="rssURL">
			<portlet:param name="struts_action" value="/asset_publisher/rss" />
		</liferay-portlet:resourceURL>

		<liferay-ui:rss resourceURL="<%= rssURL %>" />
	</c:if>
</div>

<%
PortletURL portletURL = renderResponse.createRenderURL();

SearchContainer searchContainer = new SearchContainer(renderRequest, null, null, SearchContainer.DEFAULT_CUR_PARAM, pageDelta, portletURL, null, null);

if (!paginationType.equals("none")) {
	searchContainer.setDelta(pageDelta);
	searchContainer.setDeltaConfigurable(false);
}
%>

<c:if test="<%= showMetadataDescriptions %>">
	<liferay-ui:categorization-filter
		assetType="content"
		portletURL="<%= portletURL %>"
	/>
</c:if>

<%
long portletDisplayDDMTemplateId = PortletDisplayTemplateUtil.getPortletDisplayTemplateDDMTemplateId(displayStyleGroupId, displayStyle);

Map<String, Object> contextObjects = new HashMap<String, Object>();

contextObjects.put(PortletDisplayTemplateConstants.ASSET_PUBLISHER_HELPER, AssetPublisherHelperUtil.getAssetPublisherHelper());
%>

<c:choose>
	<c:when test='<%= selectionStyle.equals("dynamic") %>'>
		<%@ include file="/html/portlet/asset_publisher/view_dynamic_list.jspf" %>
	</c:when>
	<c:when test='<%= selectionStyle.equals("manual") %>'>
		<%@ include file="/html/portlet/asset_publisher/view_manual.jspf" %>
	</c:when>
</c:choose>

<c:if test='<%= !paginationType.equals("none") && (searchContainer.getTotal() > searchContainer.getResults().size()) %>'>
	<liferay-ui:search-paginator searchContainer="<%= searchContainer %>" type="<%= paginationType %>" ajaxPagination="<%=ajaxPagination%>"/>
</c:if>

<c:if test='<%= assetLinkBehavior.equals("showFullContentAjax") %>'>
	<script type="text/javascript">
        YUI().use('node','node-event-delegate','event-key','aui-io-request', function(Y){

            var curNamespace = '<portlet:namespace/>';
            var portletBody = Y.one('#p_p_id' + curNamespace + ' .portlet-body');
            var ajaxFilterSelector = ':not(.lfr-meta-actions):not(.subscribe-action)';
            var ajaxNamespace = '';
            <c:if test='<%= !ajaxNamespace.isEmpty() %>'>
                ajaxNamespace = '<%=ajaxNamespace%>';
            </c:if>

            portletBody.delegate('click', handleLinkClick, '.title-list a,td.table-cell a,.asset-title a,.asset-more a,.header-back-to a,.ajax-view');

            function handleLinkClick(e) {
                var targetElement = e.target;
                if (targetElement && targetElement.get('tagName') !== 'A') {
                    do {
                        targetElement = targetElement.get('parentNode');
                    } while (targetElement && targetElement.get('tagName') !== 'A');
                }
                var ajaxUrl = targetElement.get('href');

                if (ajaxUrl && ajaxUrl.indexOf('http') == 0) {
                    if (portletBody) {
                        e.preventDefault();
                        var hasBackClass = e.target.hasClass('header-back-to') || e.target.hasClass('previous-level');
                        if (!hasBackClass) {
                            ajaxUrl = ajaxUrl + '?redirect=' + window.location.href;
                        }
                        Y.io.request(ajaxUrl, {
                            method: 'POST',
                            on: {
                                success: function () {
                                    var portletBodyResponse = this.get('responseData');
                                    portletBodyResponse = Y.Node.create(portletBodyResponse);
                                    var pageTitle = null;
                                    if (ajaxNamespace == '') {
                                        pageTitle = portletBodyResponse.one('title').getContent();
									}
									if (ajaxNamespace != '' && !hasBackClass) {
                                        portletBodyResponse = portletBodyResponse.one('#p_p_id' + ajaxNamespace + ' .portlet-body');
									} else {
                                        portletBodyResponse = portletBodyResponse.one('#p_p_id' + curNamespace + ' .portlet-body');
									}
                                    var curChildren = portletBody.get('children');
                                    curChildren = curChildren.filter(ajaxFilterSelector);
                                    curChildren.remove(true);
                                    window.ajaxResponseBody = portletBodyResponse;
                                    var newChildren = portletBodyResponse.get('children');
                                    newChildren = newChildren.filter(ajaxFilterSelector);
                                    portletBody.append(newChildren);
                                    if (window.history.pushState) {
                                        window.history.pushState(null,pageTitle,ajaxUrl);
									} else {
                                        console.warn('Current browser not support window.history.pushState');
									}
									if (pageTitle) {
                                        var curTitle = null;
                                        curTitle = Y.one('title');
                                        curTitle.setContent(pageTitle);
									}
                                }
                            }
                        });
                    } else {
                        console.error("Can't find '#p_p_id<portlet:namespace/> .portlet-body' for ajax");
                    }
                } else {
                    console.warn('Maybe url is incorrect: ' + ajaxUrl);
                }
            };

        });
	</script>
</c:if>

<%!
private static Log _log = LogFactoryUtil.getLog("portal-web.docroot.html.portlet.asset_publisher.view_jsp");
%>