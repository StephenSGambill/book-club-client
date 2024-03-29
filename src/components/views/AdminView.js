import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../books/BookList"
import { ClubsList } from "../clubs/ClubsList"
import { MembersList } from "../members/MembersList"
import { Profile } from "../profile/Profile"
import { BookClub } from "../clubs/Club"
import { Chapter } from "../chapters/Chapter"
import { BookForm } from "../books/BookForm"
import { ClubForm } from "../clubs/ClubForm"
import { ProfileEdit } from "../profile/ProfileEdit"
import { ClubEdit } from "../clubs/ClubEdit"
import { BookEdit } from "../books/BookEdit"

export const AdminView = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="bookList" element={<BookList />} />

                <Route path="members" element={<MembersList />} />

                <Route path="profile" element={<Profile />} />

                <Route path="clubs" element={<ClubsList />} />

                <Route path="club/:clubId" element={<BookClub />} />

                <Route path="chapter/:chapterId/club/:clubId" element={<Chapter />} />

                <Route path="books/create" element={<BookForm />} />

                <Route path="clubs/create" element={<ClubForm />} />

                <Route path="profile/edit/" element={<ProfileEdit />} />

                <Route exact path="club/edit/:clubId" element={<ClubEdit />} />

                <Route path="book/edit/:bookId" element={<BookEdit />} />





            </Route>
        </Routes>
    )
}