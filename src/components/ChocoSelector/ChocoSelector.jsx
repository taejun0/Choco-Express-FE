import { CHOCOLATES } from "../../constants/Chocolates/data";
import { useNavigate } from "react-router-dom";
import { NextBtn } from "../common/Button/NextBtn";
import { BackBtn } from "../common/Button/BackBtn";
import * as S from "./styled";

const ChocoSelector = ({ coment, selectedChoco, onSelectChoco, onNext }) => {
  const navigate = useNavigate();

  const handleChocoClick = (id) => {
    onSelectChoco(id);
    console.log("Choco Id:", id);
  };

  const handleNextClick = () => {
    if (selectedChoco) {
      onNext();
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <div>{coment}</div>
      <S.BoxContainer>
        <S.BoxGrid>
          {CHOCOLATES.map((choco) => (
            <S.BoxItem
              key={choco.id}
              selected={selectedChoco === choco.id}
              onClick={() => handleChocoClick(choco.id)}
            >
              <img src={choco.src} alt={choco.id} />
            </S.BoxItem>
          ))}
        </S.BoxGrid>
      </S.BoxContainer>
      <S.buttonContainer>
        <BackBtn onClick={handleBackClick} />

        <NextBtn onClick={handleNextClick} />
      </S.buttonContainer>
    </S.Wrapper>
  );
};

export default ChocoSelector;
