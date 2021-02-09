const formatValue = (value: number): string => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
} 
//console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number));

export default formatValue;
