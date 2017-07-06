package com.liferay.portal.util;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Locale;

/**
 * special date formats symbols to support correct month names in Russian
 * 
 * @author akakunin
 * 
 */
public class RuDateFormatSymbols extends DateFormatSymbols {

    private static final long serialVersionUID = 4526243676562545848L;

    @Override
    public String[] getMonths() {
        return new String[] {"января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"};
    }
    
	/** Apply Russian Symbols to use correct month names
	 * 
	 * @param format
	 * @param locale
	 * @return
	 */
	public static Format applyRussianSymbols(Format format, Locale locale) {
		if (locale != null && locale.getLanguage().equals("ru")) {
			if (format instanceof SimpleDateFormat) {
				SimpleDateFormat sdf = (SimpleDateFormat) format;
				sdf.setDateFormatSymbols(new RuDateFormatSymbols());
			}
		}
		
		return format;
	}
	
	public static DateFormat applyRussianSymbols(DateFormat format, Locale locale) {
		if (locale != null && locale.getLanguage().equals("ru")) {
			if (format instanceof SimpleDateFormat) {
				SimpleDateFormat sdf = (SimpleDateFormat) format;
				sdf.setDateFormatSymbols(new RuDateFormatSymbols());
			}
		}
		
		return format;
	}

}