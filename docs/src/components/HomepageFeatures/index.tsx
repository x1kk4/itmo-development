import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Пару слов о приложении',
    Svg: require('@site/static/img/undraw_docusaurus_mountaino.svg').default,
    description: (
      <>
        Удобное приложение для записи на тренировки в школу волейбола невские медведи.
      </>
    ),
  },
  {
    title: 'Для кого?',
    Svg: require('@site/static/img/undraw_docusaurus_treee.svg').default,
    description: (
      <>
        Данное приложение облегчит взаимодействие родителей, тренеров и менеджера волейбольной школы «Невские медведи».
      </>
    ),
  },
  {
    title: 'Технологический стек',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Для создания этого приложения мы используем Python, React.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
