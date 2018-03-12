<#include "../init.ftl">
<#assign label = escape(label)>
<#if required>
	<#assign label = label + ' <span class="label-required">' + languageUtil.get(requestedLocale, "required-field") + '</span>'>
</#if>

<@aui["field-wrapper"] data=data helpMessage=escape(fieldStructure.tip) label=label>
	${fieldStructure.children}
</@>