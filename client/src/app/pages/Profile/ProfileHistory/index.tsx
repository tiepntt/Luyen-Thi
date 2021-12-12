import React, { useEffect, useState } from "react";
import { documentApi } from "services/api/document/documentApi";
import DocumentHistory from "app/components/documents/DocumentHistory";
const ProfileHistory = () => {
  const [documentHistory, setDocumentHistory] = useState([]);

  useEffect(() => {
    documentApi.getHistory().then((res) => {
      if (res.status === 200) {
        setDocumentHistory(res.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="history-profile mt-5">
      {documentHistory.map((history: any) => (
        <DocumentHistory history={history} />
      ))}
    </div>
  );
};

export default ProfileHistory;
