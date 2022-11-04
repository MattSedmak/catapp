export const CatElement = ({ cat, deleteCat }) => {
  return (
    <div className='cat-item'>
      <img src={cat.url} alt='' className='list-cat-image' />
      <p className='cat-title'>{cat.name}</p>
      <p className='cat-fact'>{cat.fact}</p>
      <button
        title='Ta bort katt'
        onClick={() => deleteCat(cat.id)}
        className='remove-button'
      >
        Ta bort
      </button>
    </div>
  );
};
