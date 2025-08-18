import '../store/UserContext'
import UserContext from '../store/UserContext'

const Header = () => {
    return (
        <UserContext.Consumer>
            {(name) => (
                <header className="header">
                    <p>
                        <span>name</span>님 환영합니다.{" "}
                    </p>
                </header>
            )}
        </UserContext.Consumer>
    )
}