export const randomColor = () => {
  const colorVariations = [
    ['#F8BBD0', '#F48FB1', '#F06292'],
    ['#E1BEE7', '#CE93D8', '#BA68C8'],
    ['#C5CAE9', '#9FA8DA', '#7986CB'],
    ['#B3E5FC', '#81D4FA', '#4FC3F7'],
    ['#C8E6C9', '#A5D6A7', '#81C784'],
    ['#FFECB3', '#FFE082', '#FFD54F'],
    ['#FFCCBC', '#FFAB91', '#FF8A65'],
  ];

  const randomIndex = Math.floor(Math.random() * colorVariations.length);
  const randomShade = Math.floor(Math.random() * 3);

  return colorVariations[randomIndex][randomShade];
};
