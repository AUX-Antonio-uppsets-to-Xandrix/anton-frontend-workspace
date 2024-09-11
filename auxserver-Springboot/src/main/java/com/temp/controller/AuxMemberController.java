package com.temp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.temp.dto.AuxMember;
import com.temp.service.AuxMemberService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class AuxMemberController {

	@Autowired
	private AuxMemberService service;
	
	@PostMapping("/login")
	public AuxMember loginAuxMember(@RequestParam("id") String auxmemberId, @RequestParam("password") String auxmemberPassword) {
		
		try {
			AuxMember mem = service.loginAuxMember(auxmemberId, auxmemberPassword);
			log.info("mem : "+mem.toString());
			return mem;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}
	
	@PutMapping("/update")
	public AuxMember updateAuxMember(
			@RequestBody AuxMember auxMember) {
		log.info(auxMember.toString());
		return service.updateAuxMember(auxMember);
		
		//사용자 작업 저장/종료시 저장됨
	}
	
	@PostMapping("/insertMember")
	public ResponseEntity<String> insertAuxMember(@RequestParam("id")String auxmemberId, @RequestParam("password")String auxmemberPassword) {
		try {
			service.insertAuxMember(auxmemberId, auxmemberPassword);
			return ResponseEntity.ok("회원가입이 성공적으로 이루어졌습니다.");
		}
		catch(Exception e){
			return (ResponseEntity<String>) ResponseEntity.badRequest();
		}
	}
}
