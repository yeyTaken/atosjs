import cn from 'clsx';
import { FaLightbulb, FaBan, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const TypeToIcon = {
  0: <FaLightbulb size={20} />, // Ideia/Sugestão
  1: <FaBan size={20} />,       // Erro
  2: <FaInfoCircle size={20} />, // Informação
  3: <FaExclamationTriangle size={20} /> // Aviso
};

const gradientBorders = {
  0: 'x:border-l-[8px] x:border-blue-500 x:bg-gradient-to-r x:from-blue-500 x:via-transparent x:to-blue-300',
  1: 'x:border-l-[8px] x:border-red-500 x:bg-gradient-to-r x:from-red-500 x:via-transparent x:to-red-300',
  2: 'x:border-l-[8px] x:border-blue-500 x:bg-gradient-to-r x:from-blue-500 x:via-transparent x:to-blue-300',
  3: 'x:border-l-[8px] x:border-yellow-500 x:bg-gradient-to-r x:from-yellow-500 x:via-transparent x:to-yellow-300'
};

const textColors = {
  0: 'x:text-blue-800 dark:x:text-blue-300',
  1: 'x:text-red-900 dark:x:text-red-200',
  2: 'x:text-blue-900 dark:x:text-blue-200',
  3: 'x:text-yellow-900 dark:x:text-yellow-200'
};

const Callout = ({ type = 0, emoji = TypeToIcon[type], children }) => {
  return (
    <div
      className={cn(
        'nextra-callout x:overflow-x-auto x:mt-6 x:flex x:rounded-lg x:border x:py-2 x:pe-4 x:relative',
        'x:contrast-more:border-current! x:bg-transparent x:shadow-lg',
        gradientBorders[type],
        textColors[type]
      )}
    >
      <div
        className="x:select-none x:text-xl x:ps-3 x:pe-2"
        style={{
          fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }}
        data-pagefind-ignore="all"
      >
        {emoji}
      </div>
      <div className="x:w-full x:min-w-0 x:leading-7">{children}</div>
    </div>
  );
};

export default Callout;
