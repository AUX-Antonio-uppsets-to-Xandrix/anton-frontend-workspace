package com.temp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	// 이미지폴더경로를 react가 가져갈 수 있도록 허용
	/*@Override
	public void addResourceHandlers(ResourceHandlerRegistry r) {
		r.addResourceHandler("/images/**")
		 .addResourceLocations("file:C:/Users/kulee/Pictures/"); //바탕화면에 지정한 이미지 경로 넣어주기
	}*/
	
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000")
				//.allowedOrigins("*")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*");
		
	}
	/* allowedOrigins("http://localhost:3000") 이 주소로
	 * addMapping("/**")  3000번 뒤에 오는 모든 url api 주소를 모두 허용
	 * allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	 *                 http://localhost:3000/** 들어오는 모든 요청 허용
	 * allowedMethods("보기", "넣기" , "수정", "삭제"   , "기타등등")
	 * allowedHeaders("*") <html> <head> 정보에 들어갈 모든 요청 ok!
	 * */
}
