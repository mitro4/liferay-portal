<#include "../init.ftl">

<@aui["field-wrapper"] data=data>
	<@aui.input cssClass=cssClass dir=requestedLanguageDir helpMessage=escape(fieldStructure.tip) label=escape(label) name=namespacedFieldName type="text" value=fieldValue>
	</@aui.input>

	${fieldStructure.children}
</@>

<@aui.script use="autocomplete-list,aui-base,aui-io-request-deprecated,autocomplete-filters,autocomplete-highlighters,datasource,datasource-get,datatable-datasource">

	var field = A.one('#${portletNamespace}${namespacedFieldName}');

	var contactSearchDS = new A.DataSource.IO(
	{
		source: '/c/dynamic_data_mapping/get_site_users_action?groupId' + Liferay.ThemeDisplay.getScopeGroupId()
	});

	var contactSearchQueryTemplate = function(query)
	{
		var output = '&inputVal=' + query.trim() ;
		return output;
	};

	var contactSearchLocator = function(response)
	{
		console.log(response);
		var responseData = A.JSON.parse(response[0].responseText);
		return responseData;
	};

	var contactSearchFormatter = function(query, results)
	{
		return A.Array.map(results, function(result)
		{
			return '<span>' + result.raw.firstName + '</span></br/>'
					+ result.raw.screenName + ' ' + result.raw.emailAddress;
		});
	};

	var contactSearchTextLocator = function(result)
	{
		return result.firstName;
	};

	var contactSearchInput  = new A.AutoCompleteList(
	{
		allowBrowserAutocomplete: false,
		activateFirstItem: false,
		inputNode: field ,
		render: 'true',
		source: contactSearchDS,
		requestTemplate: contactSearchQueryTemplate,
		resultListLocator: contactSearchLocator,
		resultFormatter: contactSearchFormatter,
		resultTextLocator: contactSearchTextLocator,
		scrollIntoView: true
	}).render();
</@>
