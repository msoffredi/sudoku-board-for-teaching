import React from "react";
import './PageContainer.scss';

interface PageContainerProps {
    children?: JSX.Element;
}

export class PageContainer extends React.Component<PageContainerProps> {
    render(): JSX.Element {
        return (
            <div className="page-container">
                {this.props.children}
            </div>
        );
    }
}
