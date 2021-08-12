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
    menuRef: React.RefObject<HTMLUListElement>;
    menuIconRef: React.RefObject<HTMLInputElement>;

    constructor(props: MenuProps) {
        super(props);

        this.state = { open: false };
        this.menuRef = React.createRef();
        this.menuIconRef = React.createRef();
    }

    onBodyClick = (event: MouseEvent): void => {
        if (this.menuRef.current?.contains(event.target as Node)
            || this.menuIconRef.current?.contains(event.target as Node)) {

            return;
        }

        this.onMenuClick();
    };

    onMenuClick = (): void => {
        const open = !this.state.open;
        this.setState({ open });

        if (open) {
            document.body.addEventListener('click', this.onBodyClick);
        } else {
            document.body.removeEventListener('click', this.onBodyClick);
        }
    };

    onMenuItemClick = (callback: () => void): void => {
        // To close menu after selecting an option
        this.onMenuClick();

        callback();
    }

    render(): JSX.Element {
        const items = this.props.menuItems.map((item: MenuItem): JSX.Element => {
            const itemClass = item.selected ? 'selected' : '';

            return (
                <li
                    className={itemClass}
                    key={item.text}
                    onClick={() => this.onMenuItemClick(item.onClick)}
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
                    ref={this.menuIconRef}
                />
                <ul ref={this.menuRef}>{items}</ul>
            </div>
        );
    }
}
