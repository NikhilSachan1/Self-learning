import { join } from 'lodash';
import { INewUser } from '../interfaces/users.type';
import { UsersDto } from '../dto/users.dto';


export function fromUserDTO(dto: UsersDto): INewUser[] {
  return dto.users.map((user) => {
    const companyAddress = user.company.address;
    const userAddress = user.address;
    const fullName = `${user.firstName} ${user.lastName}`;
    return {
      [fullName]: {
        id: user.id,
      fullName,
      age: user.age,
      gender: user.gender,
      company: {
        name: user.company.name,
        address: join(
          [companyAddress.address, companyAddress.city, companyAddress.state],
          ', '
        ),
      },
      address: join(
        [userAddress.address, userAddress.city, userAddress.state],
        ', '
      ),
      }
    };
  });
}