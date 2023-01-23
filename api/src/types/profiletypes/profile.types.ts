/* eslint-disable prettier/prettier */
export class UserProfileDto {
  bio?: string
  profiePicture?: string
  gender?: GENDER
  status? :  string
  
}

export enum GENDER {
  MALE,
  FEMALE,
  PREFER_NOT_TO_SAY,
}