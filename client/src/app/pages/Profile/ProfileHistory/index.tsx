import React, { useEffect, useState } from "react";
import { documentApi } from "services/api/document/documentApi";
import DocumentHistory from "app/components/documents/DocumentHistory";
import { DocumentHistoryDetail } from "models/document/DocumentHistory";
const ProfileHistory = () => {
  const [documentHistory, setDocumentHistory] = useState<
    DocumentHistoryDetail[]
  >([]);

  useEffect(() => {
    documentApi.getHistory().then((res) => {
      if (res.status === 200) {
        setDocumentHistory(res.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="history-profile mt-0">
      {documentHistory.map((history: any, i) => (
        <DocumentHistory history={history} key={i} />
      ))}
    </div>
  );
};

export default ProfileHistory;
