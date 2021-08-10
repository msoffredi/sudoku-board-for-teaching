import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { SettingsType } from "../../types";
import { Menu } from "../Menu/Menu";
import './TopBar.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TopBarProps extends TopBarStateToProps { }

interface TopBarState {
    settings: boolean;
}

export class TopBarComponent extends React.Component<TopBarProps, TopBarState> {
    state = { settings: false };

    onMenuSettingsClick = (): void => {
        this.setState({ settings: true });
    };

    render(): JSX.Element {
        const emptyFunc = () => null;

        const menuItems = [
            { onClick: emptyFunc, text: 'Home', selected: false },
            { onClick: this.onMenuSettingsClick, text: 'Settings', selected: this.state.settings },
            { onClick: emptyFunc, text: 'About', selected: false }
        ];

        return (
            <header id="top-bar">
                <div id="logo-container">
                    <div id="icon">S</div>
                    <span>Sudoku BFT</span>
                </div>
                <Menu menuItems={menuItems} />
            </header>
        );
    }
}

interface TopBarStateToProps {
    settings: SettingsType;
}

const mapStateToProps = (store: StoreState): TopBarStateToProps => {
    return {
        settings: store.settings
    };
};

export const TopBar = connect(
    mapStateToProps
)(TopBarComponent);
