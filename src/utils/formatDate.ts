

const formatValue = (date: Date): string => {
    const d = new Date(date)
    return Intl.DateTimeFormat(['ban', 'id']).format(d);
  } 
  //console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number));
  
  export default formatValue;
  