'use client';

import { FC } from 'react';
import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  language: string;
  code: string;
}

const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ language, code }) => {
  return (
    <>
      <SyntaxHighlighterPrism language={language} style={oneDark}>
        {code}
      </SyntaxHighlighterPrism>
    </>
  );
};

export default SyntaxHighlighter;
