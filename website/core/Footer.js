/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/prop-types */

const React = require('react')

class Footer extends React.Component {
    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="footer">
                    <div className="footer-icon">
                        <a
                            href={this.props.config.baseUrl}
                            className="nav-home"
                        >
                            {this.props.config.footerIcon && (
                                <img
                                    src={
                                        this.props.config.baseUrl +
                                        this.props.config.footerIcon
                                    }
                                    alt={this.props.config.title}
                                    width="58"
                                    height="58"
                                />
                            )}
                        </a>
                    </div>
                    <div className="footer-github">
                        <a href="https://github.com/tophat/commit-utils">
                            GitHub
                        </a>
                        <a
                            className="github-button"
                            href="https://github.com/tophat/commit-utils"
                            data-icon="octicon-star"
                            data-count-href="/tophat/commit-utils/stargazers"
                            data-show-count="true"
                            data-count-aria-label="# stargazers on GitHub"
                            aria-label="Star this project on GitHub"
                        >
                            Star
                        </a>
                    </div>
                </section>
                <section className="copyright">
                    {this.props.config.copyright}
                </section>
            </footer>
        )
    }
}

module.exports = Footer
