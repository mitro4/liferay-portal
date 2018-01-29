<#include "../init.ftl">

<#if required>
	<#assign label = label + " " + languageUtil.get(requestedLocale, "required-field")>
</#if>

<@aui["field-wrapper"] data=data helpMessage=escape(fieldStructure.tip) label=escape(label)>
	${fieldStructure.children}
</@>