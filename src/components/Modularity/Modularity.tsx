import ModularityDiagram from '../../assets/Modularity/module.png';
import ModularityCircle from '../../assets/Modularity/picture near module.png';

import style from './Modularity.module.scss';

export const Modularity = () => {
  return (
    <div className={style.Modularity}>
      <h1 className="tittle">Plug-and-Play Architecture</h1>
      <div className={style.content}>
        <div className={style.top}>
          <img loading='lazy' src={ModularityCircle} className={style.circle} alt="" />
          <p>
            Simultaneously lightweight and technologically advanced approach, allowing modules to be
            added, removed, or replaced without disrupting the system.
            <br />
            <br />
            This way we ensure protocols longevity and relevance, with vector for further
            development being determined by holders of $FLFI.
          </p>
          <p></p>
        </div>
        <div className={style.line}></div>
        <div className={style.bottom}>
          <img loading='lazy' src={ModularityDiagram} className={style.diagram} alt="" />
        </div>
      </div>
    </div>
  );
};
