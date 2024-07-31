package com.my.restaurant.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDto<E> {
    private List<E> items;
    private List<Integer> pageNums;
    private PageRequestDto request;
    private boolean prev, next;
    private int currentPage, prevPage, nextPage, totPageCnt, totItemCnt;

    @Builder
    public PageResponseDto(List<E> items, PageRequestDto request, long totItemCnt) {
        this.items = items;
        this.request = request;
        this.totItemCnt = (int)totItemCnt;
        int end = (int)(Math.ceil(request.getPage() / 5.0)) * 5;
        int start = end - 4;
        int last = (int)(Math.ceil((totItemCnt/(double)request.getSize())));
        end = end > last ? last : end;
        this.prev = start > 1;
        this.next = totItemCnt > end * request.getSize();
        this.pageNums = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        if(prev) this.prevPage = start - 1;
        if(next) this.nextPage = end - 1;
        this.totPageCnt = this.pageNums.size();
        this.currentPage = request.getPage();
    }
}
// 관리자 예약 목록 조회의 경우 페이지 하나당 페이지 갯수가 5개로 설정되어 있다.
// User 화면에서 페이징 처리를 하지 않고 관리자 페이지에서만 페이징을 처리??