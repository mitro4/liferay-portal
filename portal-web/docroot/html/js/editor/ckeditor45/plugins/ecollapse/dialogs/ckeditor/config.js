
CKEDITOR.editorConfig = function( config ) {
	
	CKEDITOR.dtd.$removeEmpty['span'] = 0;
	CKEDITOR.dtd.$removeEmpty['style'] = 0;
	CKEDITOR.dtd.$removeEmpty['i'] = 0;
	CKEDITOR.dtd.$removeEmpty['br'] = 0;
	
	CKEDITOR.dtd.span.div = 1;
	CKEDITOR.dtd.span.a = 1;
	CKEDITOR.dtd.span.p = 1;
	CKEDITOR.dtd.span.i = 1;
	CKEDITOR.dtd.span.br = 1;

	CKEDITOR.dtd.a.div = 1;
	CKEDITOR.dtd.a.span = 1;
	CKEDITOR.dtd.a.p = 1;
	CKEDITOR.dtd.a.i = 1;
	CKEDITOR.dtd.a.br = 1;
	
	CKEDITOR.dtd.body.meta = 1;
	CKEDITOR.dtd.body.title = 1;
	CKEDITOR.dtd.body.style = 1;
	
	if (!CKEDITOR.stylesSet.get('liferayStyles')) {
		CKEDITOR.addStylesSet(
			'liferayStyles',
			[

			// Block Styles

			{name: 'Normal', element: 'p'},
			{name: 'Heading 1', element: 'h1'},
			{name: 'Heading 2', element: 'h2'},
			{name: 'Heading 3', element: 'h3'},
			{name: 'Heading 4', element: 'h4'},

			// Special classes

			{name: 'Preformatted Text', element:'pre'},
			{name: 'Cited Work', element:'cite'},
			{name: 'Computer Code', element:'code'},

			// Custom styles

			{name: 'Info Message', element: 'div', attributes: {'class': 'portlet-msg-info'}},
			{name: 'Alert Message', element: 'div', attributes: {'class': 'portlet-msg-alert'}},
			{name: 'Error Message', element: 'div', attributes: {'class': 'portlet-msg-error'}}
			]
		);
	}
	
	config.autoParagraph = false;

	config.autoSaveTimeout = 3000;

	config.closeNoticeTimeout = 8000;

	config.contentsCss = [
		themeDisplay.getPortalURL() + themeDisplay.getPathJavaScript() + '/editor/ckeditor45/plugins/fontawesome/font-awesome/css/font-awesome.min.css',
		themeDisplay.getPortalURL() + themeDisplay.getPathJavaScript() + '/editor/ckeditor45/plugins/bootstrapButtons/bootstrap/css/bootstrap.min.css',
		themeDisplay.getPortalURL() + themeDisplay.getPathJavaScript() + '/editor/ckeditor45/plugins/bootstrapAlert/css/bootstrap.min.css'
	];
	
	config.skin = 'office2013';

	config.entities = false;
	
	config.allowedContent = true;
	
	config.fillEmptyBlocks = false;
	
	config.tabSpaces = 0;
	
	config.enterMode = CKEDITOR.ENTER_BR;
	
	config.shiftEnterMode = CKEDITOR.ENTER_BR;
	
	config.extraAllowedContent = 'p(*)[*]{*};div(*)[*]{*};li(*)[*]{*};ul(*)[*]{*};span(*)[*]{*};a(*)[*]{*};i(*)[*]{*}';

	config.extraPlugins = 'a11yhelpbtn,media,scayt,wsc,lineheight,uploadArticle,fontawesome,font,bootstrapAlert,bootstrapButtons,texttransform,ecollapse';
	
	config.height = 265;

	config.language = 'ru';

	config.pasteFromWordRemoveFontStyles = false;

	config.pasteFromWordRemoveStyles = false;

	config.resize_enabled = true;
	
	config.stylesCombo_stylesSet = 'liferayStyles';

	config.title = false;

	config.toolbar_liferay = [
		['Bold', 'Italic', 'Underline', 'Strike'],
		['Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'],
		['Styles', 'Font', 'FontSize', '-', 'lineheight', '-', 'TextColor', 'BGColor'],
		'/',
		['FontAwesome'],['ECollapse'],
		['BootstrapAlert','BootstrapButtons'],
		['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
		['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
		['TransformTextSwitcher','TransformTextToLowercase','TransformTextToUppercase','TransformTextCapitalize'],
		['Image', 'Link', 'Unlink', 'Anchor'],
		['Flash', 'Table', '-', 'Smiley', 'SpecialChar'],
		['Find', 'Replace', 'SpellChecker', 'Scayt'],
		['SelectAll', 'RemoveFormat'],
		['Subscript', 'Superscript']
		,['UploadArticle']
		,['A11YBtn']
	];
};