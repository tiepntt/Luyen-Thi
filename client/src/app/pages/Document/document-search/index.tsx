import { Grid } from "@material-ui/core";
import { AppPagination } from "app/components/_share/Pagination";
import React, { useEffect, useState, Suspense } from "react";
import { Container } from "react-bootstrap";
import { history } from "services/history";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import qs from "query-string";
import { documentApi } from "services/api/document/documentApi";
import { DocumentTitle } from "models/document/DocumentTitle";
import { toastService } from "services/toast";
import { useAppContext } from "hooks/AppContext";
import "./style.scss";
import SnipperLayout from "app/components/_share/Layouts/SpinnerLayout";
import DocumentSearchForm from "app/components/_share/Form/DocumentSearchForm";
const AppBreadcumbs = React.lazy(
  () => import("app/components/_share/Breadcrumbs/AppBreadcumbs")
);
const DocumentSearchSidebar = React.lazy(
  () => import("app/components/sidebars/DocumentSearchSidebar")
);
const DocumentLabel = React.lazy(
  () => import("app/components/documents/DocumentLabel")
);
const DocumentSearch: React.FC = () => {
  const [count, setCount] = React.useState<number>();
  const { scrollTop } = useAppContext();
  const [documents, setDocuments] = useState<DocumentTitle[]>([]);
  const [filter] = useQueryParams({
    key: StringParam,
    page: NumberParam,
    gradeCode: StringParam,
    subjectCode: StringParam,
    type: NumberParam,
  });
  const onChangeCondition = (key: string, value: any) => {
    const newFilter = {
      ...filter,
      [key]: value,
      page: 1,
    };
    history.push({
      pathname: "/document",
      search: qs.stringify(newFilter),
    });
  };
  const onChangePage = (page: number) => {
    const newFilter = {
      ...filter,
      page,
    };
    history.push({
      pathname: "/document",
      search: qs.stringify(newFilter),
    });
  };

  useEffect(() => {
    documentApi
      .search({
        ...filter,
        take: 5,
        skip: ((filter.page || 1) - 1) * 5,
      } as any)
      .then((res) => {
        if (res.status !== 200) {
          return toastService.error(res.data.message);
        }
        scrollTop();
        setDocuments(res.data.documents);
        setCount(res.data.total || 0);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const params = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Tìm kiếm",
      href: "/",
    },
  ];

  return (
    <div className="document-search-page">
      <Suspense
        fallback={<SnipperLayout loading={false} className="page-no-data" />}
      >
        <SnipperLayout className="page-no-data" loading={count !== undefined}>
          <DocumentSearchForm
            filter={filter as any}
            onChangeCondition={onChangeCondition}
          />
          <Container className="content">
            <Grid container spacing={3}>
              <Grid item lg={8} xl={8} xs={12} md={12}>
                <div className="list-document-side-bar">
                  <AppBreadcumbs rootPath={"/document"} params={params} />
                  <div className="header-title">
                    Đề thi thử THPT Quốc gia chọn lọc, miễn phí
                  </div>
                  <div id="hint-result">
                    <b>
                      {((filter.page || 1) - 1) * 5 + 1} -{" "}
                      {(filter.page || 1) * 5 >= (count || 0)
                        ? count
                        : (filter.page || 1) * 5}
                    </b>{" "}
                    trong <b>{count}</b> kết quả cho "
                    <span id="key-word">Từ khóa tìm kiếm</span>"
                  </div>
                  <div className="list-document">
                    {documents.map((document, i) => (
                      <DocumentLabel document={document} key={i} />
                    ))}
                  </div>
                  <hr />
                  <div className="pagination-tag">
                    <AppPagination
                      pageActive={filter.page || 1}
                      lastPage={Math.ceil((count || 0) / 5)}
                      onPageChange={onChangePage}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item lg={4} xl={4} xs={12} md={12}>
                <div className="document-side-bar">
                  <DocumentSearchSidebar />
                </div>
              </Grid>
            </Grid>
          </Container>
        </SnipperLayout>
      </Suspense>
    </div>
  );
};

export default DocumentSearch;
