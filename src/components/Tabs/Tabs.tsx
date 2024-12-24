import style from './Tabs.module.scss';

interface TabProps {
  selectedTabId: number;
  setSelectedTabId: (id: number) => void;
}

export const Tabs = ({ selectedTabId, setSelectedTabId }: TabProps) => {
  const tabsName = [
    { id: 1, name: 'How to Buy' },
    { id: 2, name: 'FAQ' },
  ];
  return (
    <div className={style.Tabs}>
      {tabsName.map((tab, i) => (
        <div
          className={
            selectedTabId === tab.id
              ? style.tab_titles + ' ' + ' ' + style.active
              : style.tab_titles
          }
         
          onClick={() => setSelectedTabId(tab.id)}
          key={i}>
          {tab.name}
        </div>
      ))}
      {/* <p  style={{backgroundColor: '#ffd975' ,color: 'black',fontSize:'25px'}} */}
    </div>
  );
};
