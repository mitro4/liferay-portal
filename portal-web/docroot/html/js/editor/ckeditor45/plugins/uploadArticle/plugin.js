CKEDITOR.plugins.add('uploadArticle', {
	icons: 'uploadArticle',
	init: function(editor){
		
		editor.addCommand(
				'uploadArticleAction', 
				new CKEDITOR.dialogCommand('uploadArticleDialog')
		);
		
		editor.ui.addButton('UploadArticle', {
			label: 'Импорт из файла',
			command: 'uploadArticleAction',
			toolbar: 'liferayArticle'
		});
		
		CKEDITOR.dialog.add('uploadArticleDialog', this.path + 'dialogs/uploadArticleDialog.js');
	}
});
