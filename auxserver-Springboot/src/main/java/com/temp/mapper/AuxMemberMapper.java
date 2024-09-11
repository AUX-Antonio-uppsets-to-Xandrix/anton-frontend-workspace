package com.temp.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.temp.dto.AuxMember;

@Mapper
public interface AuxMemberMapper {
	AuxMember loginAuxMember(AuxMember auxMember);
	void insertAuxMember(AuxMember auxMember);
	void updateAuxMember(AuxMember auxMember);
}
