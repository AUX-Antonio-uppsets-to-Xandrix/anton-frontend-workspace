package com.temp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import com.temp.dto.AuxMember;
import com.temp.mapper.AuxMemberMapper;

@Service
public class AuxMemberService {
	@Autowired 
	private AuxMemberMapper auxMemberMapper;
	
	public AuxMember loginAuxMember(String auxmemberId, String auxmemberPassword) throws JSONException {
		AuxMember mem = new AuxMember();
		mem.setAuxmemberId(auxmemberId);
		mem.setAuxmemberPassword(auxmemberPassword);
		mem = auxMemberMapper.loginAuxMember(mem);
		
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("grayscale",mem.getAuxworkingsetGrayscale());
		jsonObj.put("threshold",mem.getAuxworkingsetThreshold());
		jsonObj.put("brightness",mem.getAuxworkingsetBrightness());
		jsonObj.put("rotation",mem.getAuxworkingsetRotation());
		
		mem.setAuxmemberWorkingsetString(jsonObj.toString());
		return mem;
	}
	
	public void insertAuxMember(String auxmemberId, String auxmemberPassword) throws Exception {
		AuxMember mem = new AuxMember();
		mem.setAuxmemberId(auxmemberId);
		mem.setAuxmemberPassword(auxmemberPassword);
		auxMemberMapper.insertAuxMember(mem);
	}

	public AuxMember updateAuxMember(AuxMember auxMember) {
		
		auxMemberMapper.updateAuxMember(auxMember);
		return auxMember;
	}
}
