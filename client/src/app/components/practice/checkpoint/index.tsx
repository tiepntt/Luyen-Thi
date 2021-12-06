import { Grid } from "@material-ui/core";
// import CheckpointSideBar from "app/components/sidebars/CheckpointSideBar";
import PracticeBanner from "app/components/_share/Banners/PracticeBanner";
import AppBreadcumbs from "app/components/_share/Breadcrumbs/AppBreadcumbs";
import PracticeModal from "app/components/_share/Modals/PracticeModal";
import { ChapterIcon } from "assets/images/practice";
import { useAppContext } from "hooks/AppContext";
import { PracticeConfig } from "models/practice/practiceConfig";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import "./style.scss";
import { useQueryParams } from "hooks/QueryParam";
import Ranking from "../ranking";
import { DocumentHistoryRank } from "models/document/DocumentHistory";

const ranking_data: DocumentHistoryRank[] = [
  {
    user: {
      id: "1",
      firstName: "Manh",
      lastName: "Nguyen Van",
      avatarUrl:
        "https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg.webp",
    },
    numberCorrect: 100,
    rank: 1,
    timeDuration: 100,
  },
  {
    user: {
      id: "2",
      firstName: "Manh",
      lastName: "Nguyen Van",
      avatarUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscr.vn%2Fhinh-avatar.html&psig=AOvVaw1v7RaXQp9jQcC2iDAlqBI5&ust=1639382764280000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDhpu3m3fQCFQAAAAAdAAAAABAD",
    },
    numberCorrect: 100,
    rank: 2,
    timeDuration: 100,
  },
  {
    user: {
      id: "3",
      firstName: "Manh",
      lastName: "Nguyen Van",
      avatarUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscr.vn%2Fhinh-avatar.html&psig=AOvVaw1v7RaXQp9jQcC2iDAlqBI5&ust=1639382764280000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDhpu3m3fQCFQAAAAAdAAAAABAD",
    },
    numberCorrect: 100,
    rank: 3,
    timeDuration: 100,
  },
  {
    user: {
      id: "4",
      firstName: "Manh",
      lastName: "Nguyen Van",
      avatarUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscr.vn%2Fhinh-avatar.html&psig=AOvVaw1v7RaXQp9jQcC2iDAlqBI5&ust=1639382764280000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDhpu3m3fQCFQAAAAAdAAAAABAD",
    },
    numberCorrect: 100,
    rank: 4,
    timeDuration: 100,
  },

];

const CheckpointPractice: React.FC = () => {
  const { subjectCode } = useParams<any>();
  const [showPractice, setShowPractice] = useState(false);

  const { scrollTop } = useAppContext();

  const queryParmas = useQueryParams();

  const { chapters, subjects, levels } = useAppContext();
  const subject = subjects.find((s) => s.code === subjectCode);
  const chaptersPractice = chapters.filter((c) => c.subjectId === subject?.id);
  const [config, setConfig] = useState<PracticeConfig>(null as any);
  const params = [
    {
      title: "Thi THPT Quốc Gia",
      href: "/practice",
    },
    {
      title: subject?.name || "",
      href: `/practice/${subjectCode}`,
    },
    {
      title: "Ôn luyện theo chủ điểm",
      href: `/practice/${subjectCode}`,
    },
  ];
  const [levelIds, setLevelIds] = useState<string[]>(levels.map((i) => i.id));
  useEffect(() => {
    setLevelIds(levels.map((i) => i.id));
  }, [levels]);
  const changeLevels = (levelId: string) => {
    if (levelIds.includes(levelId)) {
      setLevelIds(levelIds.filter((i) => i !== levelId));
    } else {
      setLevelIds([...levelIds, levelId]);
    }
  };
  const practice = (chapterId: string, unitId?: string) => {
    setShowPractice(true);
    setConfig({ chapterId, unitId, levelIds, subjectId: subject?.id || "" });
    // lấy question về
  };
  useEffect(() => {
    const section = queryParmas.get("section");
    if (section && scrollTop) {
      scrollTop(section);
    }
  }, [queryParmas, scrollTop]);
  return (
    <div className="checkpoint-practice">
      <PracticeBanner
        title="Ôn luyện theo chủ đề: Toán học"
        subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
      />
      <Container className="content-page">
        <Grid container spacing={3}>
          <Grid item lg={8} xl={8} xs={12} md={12}>
            <div className="list-chappter-side-bar">
              <AppBreadcumbs params={params} />
              {chaptersPractice.map((chapter, index) => (
                <React.Fragment key={index}>
                  <div className="chapter-option" id={`chapter-${index}`}>
                    <div
                      className="chapter-header d-flex"
                      onClick={() => practice(chapter.id)}
                    >
                      <div className="chapter-icon">
                        <Image src={ChapterIcon} width={25} height={25} />
                      </div>
                      <div className="chapter-name mx-2"> {chapter.name}</div>
                    </div>
                    <div className="chapter-units">
                      {chapter.units.map((unit, i_unit) => (
                        <div
                          className="unit d-flex"
                          key={i_unit}
                          onClick={() => practice(chapter.id, unit.id)}
                        >
                          <div className="unit-icon"></div>
                          <div className="unit-name mx-2">
                            <div style={{ display: "inline", marginRight: 15 }}>
                              <BsPlusCircle />
                            </div>
                            {unit.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index !== chaptersPractice.length - 1 && (
                    <div className="unit-declarative" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </Grid>
          <Grid item lg={4} xl={4} xs={12} md={12}>
            <div className="level-config">
              <div className="level-label">Độ khó</div>
              <div className="level-label-clarative"></div>
              <div className="levels">
                {levels.map((level, i_level) => (
                  <div className="level" key={i_level}>
                    <Form.Check
                      type="checkbox"
                      label={level.name}
                      checked={levelIds.includes(level.id)}
                      onChange={() => changeLevels(level.id)}
                      className="level-checbox"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="level-config">
              <div className="level-label">Xếp hạng</div>
              <div className="level-label-clarative"></div>
              <div className="d-flex">
                <div style={{flexGrow: 1}}>
                  <Row>
                    <Col className="col-2">
                      <Image src={ranking_data[0].user.avatarUrl} roundedCircle fluid />
                    </Col>
                    <Col className="col-6 d-flex align-items-center">
                      <span>Nguyễn Văn Mạnh</span>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex align-items-center">500</div>
              </div>
              <div className="d-flex">
                <div style={{flexGrow: 1}}>
                  <Row>
                    <Col className="col-2">
                      <Image src={ranking_data[0].user.avatarUrl} roundedCircle fluid />
                    </Col>
                    <Col className="col-6 d-flex align-items-center">
                      <span>Nguyễn Văn Mạnh</span>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex align-items-center">500</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <PracticeModal
        show={showPractice}
        setShow={setShowPractice}
        config={config}
      />
    </div>
  );
};

export default CheckpointPractice;
