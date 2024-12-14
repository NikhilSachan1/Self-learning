import { DirectSaleApiResponseDto } from '../dto/direct-sales.dto';
import { IDirectSaleTransformedData, ItemProduct } from '../interfaces/direct-sales.type';

export function fromDirectSaleApiResponseDTO(dto: DirectSaleApiResponseDto): IDirectSaleTransformedData {
  const result: IDirectSaleTransformedData = {};

  // Iterate over each item in the response
  dto.value.items.forEach((item) => {
    const categoryId = item.category.id;
    const groupId = item.group.id;
    const code = item.code;
    
    (item.products).forEach((product) => {
      const itemCode = product.itemCode;
      const color = product.colour || 'No_Color';
      const size = product.size || 'No_Size';

      // Initialize the structure if it doesn't exist
      if (!result[categoryId]) {
        result[categoryId] = {};
      }
      if (!result[categoryId][groupId]) {
        result[categoryId][groupId] = {};
      }
      if (!result[categoryId][groupId][code]) {
        result[categoryId][groupId][code] = {};
      }
      if (!result[categoryId][groupId][code][itemCode]) {
        result[categoryId][groupId][code][itemCode] = {};
      }
      if (!result[categoryId][groupId][code][itemCode][color]) {
        result[categoryId][groupId][code][itemCode][color] = {};
      }
      if (!result[categoryId][groupId][code][itemCode][color][size]) {
        result[categoryId][groupId][code][itemCode][color][size] = [];
      }

      // Add the size to the color's size array
      if (size) {
        result[categoryId][groupId][code][itemCode][color][size].push(product as ItemProduct);
      }
    });
  });
  return result;
}
