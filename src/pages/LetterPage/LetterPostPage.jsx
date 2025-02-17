import * as S from "./styled";
import React, { useState } from "react";
import { NameSetting } from "../../components/NameSetting/NameSetting";
import HeartBackG from "../../components/common/Heartbackground/heartBackG";
import ChocoSelector from "../../components/ChocoSelector/ChocoSelector";
import { LetterPost } from "../../components/letterPost/LetterPost";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { postChocolate } from "../../apis/postChoco";

export const LetterPostPage = () => {
  const navigate = useNavigate();
  const { boxId } = useParams();
  const [selectedChoco, setSelectedChoco] = useState("");
  const [isSelectedChoco, setIsSelectedChoco] = useState(false);
  const [nickName, setNickName] = useState("");
  const [isNameSetting, setIsNameSetting] = useState(false);
  const location = useLocation();
  const { otherData } = location.state || {};
  const handleSelectChoco = (id) => {
    setSelectedChoco(id);
    console.log(`choco ID: ${id}`);
  };

  const handleNext = () => {
    if (selectedChoco) {
      setIsSelectedChoco(true);
    }
  };
  const handleSubmit = (inputValue) => {
    setNickName(inputValue);
    console.log("닉네임:", inputValue);
    setIsNameSetting(true);
  };

  const handleNameBack = () => {
    setIsSelectedChoco(false);
  };
  const handleContentBack = () => {
    setIsNameSetting(false);
  };

  const handleContentSubmit = async (content) => {
    console.log(content);
    //서버에 post 후 완료페이지로 이동

    try {
      const res = await postChocolate(boxId, nickName, content, selectedChoco);
      if (res.status === 201) {
        console.log("초콜릿전달 성공");
        navigate(`/box/${boxId}/complete`, { state: { otherData } });
      } else {
        console.log("초콜릿 전송 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      <HeartBackG />
      <S.Wrapper>
        {isNameSetting ? (
          <LetterPost
            selectedChoco={selectedChoco}
            nickName={nickName}
            onsubmit={handleContentSubmit}
            onBack={handleContentBack}
          />
        ) : isSelectedChoco ? (
          <NameSetting
            coment_1={"상대방이 확인할"}
            coment_2={"이름을 정해주세요"}
            inputValue={nickName} // 통합된 상태 전달
            onInputChange={(value) => setNickName(value)}
            onSubmit={handleSubmit}
            onBack={handleNameBack}
          />
        ) : (
          <ChocoSelector
            coment="보내고 싶은 초콜릿을 선택해주세요"
            selectedChoco={selectedChoco}
            onSelectChoco={handleSelectChoco}
            onNext={handleNext}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};
