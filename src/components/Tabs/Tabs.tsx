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
          style={
            selectedTabId === tab.id
              ? {
                  background: 'transparent',
                  color: '#fff',
                  borderBottom: '2px solid rgb(29, 30, 44)',
                  marginBottom: '-2px',
                }
              : {}
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
