import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

import { createSHA256 } from '../../utils/common.js';
import { User } from '../../types/user.type.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.password = data.password;
  }

  @prop({
    type: String,
    required: true,
    default: '',
    minlength: [1, 'Min length for name 1'],
    maxLength: [15, 'Max length for name 15'],
  })
  public name;

  @prop({
    type: String,
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email;

  @prop({
    type: String,
    default: 'default-avatar.jpg',
    minlength: [5, 'Min length for avatar path is 5'],
  })
  public avatar;

  @prop({
    type: String,
    required: true,
    default: '',
    minlength: [6, 'Min length for password 6'],
    maxLength: [12, 'Max length for password 12'],
  })
  public password;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
