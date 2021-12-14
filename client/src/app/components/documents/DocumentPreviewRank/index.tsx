import { Avatar } from "@material-ui/core";
import SnipperLayout from "app/components/_share/Layouts/SpinnerLayout";
import { TopOne, TopThree, TopTwo } from "assets/images/user";
import { useAppContext } from "hooks/AppContext";
import { DocumentHistoryRank } from "models/document/DocumentHistory";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";
import { TimeFunction } from "utils/timeFunction";
import "./style.scss";
interface Props {
  totalQuestions?: number;
}
const TopUnderImage = [TopOne, TopTwo, TopThree];
const DocumentPreviewRank: React.FC<Props> = ({ totalQuestions }) => {
  const { id } = useParams<any>();
  const [ranks, setRanks] = useState<DocumentHistoryRank[]>([]);
  // getRank
  useEffect(() => {
    documentApi.getRank(id).then((res) => {
      if (res.status === 200) {
        setRanks(res.data);
        scrollTop("ranking-document", "center");
      } else {
        toastService.error(res.data.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const TopUser: React.FC<PropsUser> = ({ rank, index }) => {
    return (
      <div className="user-top-item">
        <div className="avart-user">
          <Avatar
            style={{ width: 120, height: 120 }}
            className="avatar"
            src={rank?.user.avatarUrl}
          />
          <div className="border-bottom-img">
            <Image src={TopUnderImage[index]} width={180} />
          </div>
          <div className="name-user">{`${rank?.user.lastName || ""} ${
            rank?.user.firstName || ""
          }`}</div>
        </div>
      </div>
    );
  };
  const { scrollTop } = useAppContext();
  return (
    <div id="ranking-document">
      <SnipperLayout loading={ranks}>
        <div className="top-users text-center mt-3" id="top-user">
          <div className="top-3-user justify-content-center d-inline-flex">
            <div className="top-user-2 d-inline-block text-center m-auto">
              <TopUser index={1} rank={ranks[1]} />
            </div>
            <div className="top-user-1 d-inline-block text-center m-auto">
              <TopUser index={0} rank={ranks[0]} />
            </div>
            <div className="top-user-3 d-inline-block text-center m-auto">
              <TopUser index={2} rank={ranks[2]} />
            </div>
          </div>
        </div>
        <div className="list-rank mt-5">
          <div className="row label-rank">
            <div className="col-1 index-rank">#</div>
            <div className="col-9 col-md-7">Người dùng</div>
            <div className="col-2 time-duration">Thời gian làm</div>
            <div className="col-2  score">Điểm</div>
          </div>
          {ranks.map((rank) => (
            <div className={`row rank-item`}>
              <div className="col-1 index-rank">{rank.rank}</div>
              <div className="col-9 col-md-7">
                <div className="d-flex user-info">
                  <Avatar src={rank.user.avatarUrl} />
                  <div className="user-name mx-4">{`${rank.user.lastName} ${rank.user.firstName}`}</div>
                </div>
              </div>
              <div className="col-2 time-duration">
                <div className="time-result">
                  <div className="time-number">
                    {TimeFunction.convertSeconds(rank.timeDuration * 60)}
                  </div>
                </div>
              </div>
              <div className="col-2 score">
                <div className="point-result d-flex">
                  {((rank.numberCorrect * 10) / (totalQuestions || 1)).toFixed(
                    2
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SnipperLayout>
    </div>
  );
};

export default DocumentPreviewRank;
interface PropsUser {
  rank?: DocumentHistoryRank;
  index: number;
}
