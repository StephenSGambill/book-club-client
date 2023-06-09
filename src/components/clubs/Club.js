import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { getBookClubById, getBookById, getChaptersByBook, getClubMembers } from "../managers/ApiManager";
import "./Club.css"

export const BookClub = () => {
    const { chapterId, clubId } = useParams()
    const [bookClub, setBookclub] = useState([])
    const [book, setBook] = useState([])
    const [clubMembers, setClubMembers] = useState([])
    const [bookChapters, setBookChapters] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getBookClubById(clubId)
                .then((clubArray) => {
                    const thisClub = clubArray[0]
                    setBookclub(thisClub)

                    getBookById(thisClub.bookId)
                        .then(bookArray => {
                            const thisBook = bookArray[0]
                            setBook(thisBook)
                        })

                    getClubMembers()
                        .then((membersArray) => {
                            setClubMembers(membersArray)
                        })
                    getChaptersByBook()
                        .then(bookChaptersArray => {
                            setBookChapters(bookChaptersArray)

                        }
                        )
                })

        },
        []
    )


    return (
        <>
            <article className="bookClubContainer">
                <button className="btn"
                    onClick={(evt) => {
                        navigate(`/profile`)
                    }

                    }>Return to Profile</button>

                <h2 className="header">{bookClub.name} Book Club</h2>

                <section className="bookClub" key={`bookClub--${bookClub.id}`}>
                    <div>
                        <img className="bookCover" src={book.image} alt="Book Cover" />
                    </div>
                    <div className="bookInfo">
                        <div>Title: {book.title}</div>
                        <div>Author: {book.author}</div>
                        <div>Purpose: {bookClub.purpose}</div>
                    </div>
                </section>
                <section className="clubMembers">
                    <h3>Club Members:</h3>

                    {
                        clubMembers.map(clubMember => {
                            if (clubMember.clubId === bookClub.id) {
                                return <li key={clubMember.member.id} >{clubMember.member.firstName} {clubMember.member.lastName}</li>
                            }
                        })
                    }
                </section>
                <section className="chapterContainer">
                    <h3 >Chapters (click for chapter comments)</h3>
                    {
                        bookChapters
                            .sort((chapterA, chapterB) => chapterA.order > chapterB.order ? 1 : -1)

                            .map(bookChapter => {
                                if (bookChapter.bookId === book.id) {
                                    return <Link className="chapter_link" key={bookChapter.id} to={`/chapter/${bookChapter.id}/club/${bookClub.id}`}><li >{bookChapter.title}</li></Link>
                                }
                            })
                    }
                </section>


            </article>
        </>
    )



}
