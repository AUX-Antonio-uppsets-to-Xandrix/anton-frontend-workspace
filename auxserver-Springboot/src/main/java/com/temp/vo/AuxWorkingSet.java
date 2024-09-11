package com.temp.vo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuxWorkingSet {
	//실제로 필요한가??
	//private int uniqueID;//
	private int auxworkingsetGrayscale;
    private int auxworkingsetThreshold;
    private int auxworkingsetBrightness;
    private int auxworkingsetRotation;
}
