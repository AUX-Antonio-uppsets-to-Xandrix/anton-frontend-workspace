package com.temp.dto;

import org.springframework.boot.configurationprocessor.json.JSONObject;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuxMember {
	private int uniqueId;
    private String auxmemberId;
    private String auxmemberPassword;
    //private int workingsetId;
    private String auxmemberWorkingsetString;
    //workingset 형식은 JSON
    /*예시
     "{grayscale:50,threshold:40,brightness:50,rotation:0}"
     */
	private int auxworkingsetGrayscale;
	private int auxworkingsetThreshold;
	private int auxworkingsetBrightness;
	private int auxworkingsetRotation;
    
    private String auxmemberImageurl;
    
}
