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

export class Menu extends React.Component<MenuProps> {
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
                <input id="menu-icon" type="checkbox" />
                <ul>{items}</ul>
            </div>
        );
    }
}
