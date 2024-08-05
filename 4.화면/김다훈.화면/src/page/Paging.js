import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paging = ({ response, toList }) => {
    const { prev, next, prevPage, nextPage, pageNums, currentPage } = response;

    return (
        <div className="m-6 d-flex align-items-center justify-content-center" >
            <Pagination >
                {prev && (
                    <Pagination.Prev  onClick={() => toList({ page: prevPage })} />
                )}
                {pageNums.map((pageNum) => (
                    <Pagination.Item
                        key={pageNum}
                        active={currentPage === pageNum}
                        onClick={() => toList({ page: pageNum })}
                    >
                        {pageNum}
                    </Pagination.Item>
                ))}
                {next && (
                    <Pagination.Next onClick={() => toList({ page: nextPage })} />
                )}
            </Pagination>
        </div>
    );
};

export default Paging;