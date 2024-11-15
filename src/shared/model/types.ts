export interface PageRequestDto {
  page: number;
  size: number;
}

export interface PageResponseDto<T> {
  dtoList: Array<T>; // <E>로 제네릭을 사용
  pageNumList: Array<number>;
  pageRequestDto: PageRequestDto;
  prev: boolean;
  next: boolean;
  totalCount: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
}
