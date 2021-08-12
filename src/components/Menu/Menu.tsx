import React from "react";
import './Menu.scss';

interface MenuItem {
    onClick: () => void;
    text: string;
    selected: boolean;
}

interface MenuProps {
    menuItems: MenuItem[];
}

interface MenuState {
    open: boolean;
}

export class Menu extends React.Component<MenuProps, MenuState> {
    state = { open: false };

    onMenuClick = (): void => {
        this.setState({ open: !this.state.open });
    };

    render(): JSX.Element {
        const items = this.props.menuItems.map((item: MenuItem): JSX.Element => {
            const itemClass = item.selected ? 'selected' : '';

            return (
                <li
                    className={itemClass}
                    key={item.text}
                    onClick={item.onClick}
                >
                    {item.text}
                </li>
            );
        });

        return (
            <div id="menu-container">
                <i className="fas fa-bars"></i>
                <input
                    id="menu-icon"
                    type="checkbox"
                    checked={this.state.open}
                    onChange={this.onMenuClick}
                />
                <ul>{items}</ul>
            </div>
        );
    }
}
