import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import React from 'react'

const CodeBlock: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, className }) => {
    const language = (className?.replace(/language-/, '') as Language | undefined) ?? 'bash'

    return (
        <Highlight {...defaultProps} theme={theme} code={String(children).trim()} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: '20px' }}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

export default CodeBlock
