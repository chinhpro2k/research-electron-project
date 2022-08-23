import React, { FC, useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
// import {
//   LeftOutlined,
//   RightOutlined,
//   DownloadOutlined,
// } from '@ant-design/icons';
import styled from 'styled-components';

interface IProps {
  fileUrl: string;
}
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfWraper = styled.div`
  .pdf-view {
    position: relative;
  }
  .btn-read {
    position: absolute;
    top: 50%;
    cursor: pointer;
  }
  .btn-next {
    right: 0;
  }
  .btn-prev {
    left: 0;
  }
  .page-status {
    display: flex;
    justify-content: center;
    font-weight: 600;
    text-align: center;
  }
  .select-page {
    display: flex;
  }
  .line {
    margin: 0 8px;
    border-right: 1px solid #f0f0f0;
  }
  .page-pdf {
    display: flex;
    justify-content: center;
    height: calc(100vh) !important;
  }
  .page-pdf > canvas {
    max-width: 100%;
    height: calc(100vh) !important;
  }
  .download {
    button {
      color: #007a3a;
      background: #ffffff;
      border: 1px solid #007a3a;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: #ffffff;
        background: #007a3a;
      }
    }
  }
`;
const ReadPDF: FC<IProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [arrNum, setArrNum] = useState([]);
  // const [data, setData] = useState();
  // const [loadingText, setLoadingText] = useState(
  //   'Đang tải tài liệu. Vui lòng chờ trong giây lát...'
  // );
  const documentRef = useRef<HTMLDivElement>(null);
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
  // useEffect(() => {
  //   axios({
  //     url: fileUrl + '?original=0',
  //     method: 'GET',
  //     responseType: 'blob', // Important
  //   })
  //     .then((response) => setData(response.data))
  //     .catch(() =>
  //       setLoadingText(
  //         'Lỗi tải file. Vui lòng liên hệ Quản trị viên để biết thêm chi tiết'
  //       )
  //     );
  // }, [fileUrl]);
  useEffect(() => {
    // window.addEventListener('wheel', handleScroll);

    return () => {
      // window.removeEventListener('wheel', handleScroll);
    };
  }, [numPages, pageNumber]);
  // @ts-ignore
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    const newArr = [];
    for (let i = 0; i < numPages; i++) {
      newArr.push(i + 1);
    }
    // @ts-ignore
    setArrNum(newArr);
  };

  const changePage = (offset: any) =>
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  const onChangeSelectPage = (text: any) => {
    setPageNumber(Number(text.target.value));
  };
  const previousPage = () => changePage(-1);

  const nextPage = () => changePage(1);
  // @ts-ignore
  return (
    <React.Fragment>
      <PdfWraper>
        <div className="page-status ">
          <div>
            PAGE {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
          </div>
          <div className="line"></div>
          <div className="select-page ">
            <div className="font-bold" style={{ marginRight: '6px' }}>
              Select Page:{' '}
            </div>
            <select
              className="block w-16 text-gray-900 text-center focus:outline-none py-2 rounded-full"
              onChange={onChangeSelectPage}
              value={pageNumber}
            >
              {arrNum &&
                arrNum.length &&
                arrNum.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="pdf-view" ref={documentRef}>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className={'page-pdf'} pageNumber={pageNumber} scale={zoom} />
          </Document>
        </div>
        {!(pageNumber >= numPages) && (
          <div className="btn-read btn-next absolute" onClick={nextPage}>
            {/*<RightOutlined style={{ fontSize: '32px' }} />*/}
            {'<'}
          </div>
        )}
        {!(pageNumber <= 1) && (
          <div className="btn-read btn-prev absolute" onClick={previousPage}>
            {/*<LeftOutlined style={{ fontSize: '32px' }} />*/}
            {'>'}
          </div>
        )}
      </PdfWraper>
    </React.Fragment>
  );
};

export default ReadPDF;
