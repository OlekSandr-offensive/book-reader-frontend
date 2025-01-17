import LibraryForm from 'js/components/LibraryForm';
import ModalLibrary from 'js/components/ModalLibrary';
import { useFetchAllBooksQuery } from 'js/redux/books/booksApi';
import Media from 'react-media';
import sprite from '../../../sprites/library-sprite.svg';
import s from './Library.module.css';
import { Loading } from 'notiflix';
import PlanToReadList from 'js/components/LibraryCard/PlanToReadList';
import { LibraryButton } from 'js/components/LibraryCard/LibraryButton/LibraryButton';
import { useSelector } from 'react-redux';
import {
  getDone,
  getPlan,
  getRead,
} from 'js/redux/books/books-slice';
import AlreadyReadList from 'js/components/LibraryCard/AlreadyReadList';
import { useState } from 'react';

const Library = () => {
  const { isFetching } = useFetchAllBooksQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const booksPlan = useSelector(getPlan);
  const booksRead = useSelector(getRead);
  const booksDone = useSelector(getDone);

  return (
    <div>
      <>
        {!isFetching && Loading.remove()}
        <LibraryForm />

        {booksPlan?.length || booksRead?.length || booksDone?.length ? (
          <>
            <>
              {booksDone?.length > 0 ? (
                <AlreadyReadList library={booksDone} status={'done'} />
              ) : null}
              {booksRead?.length > 0 ? (
                <PlanToReadList library={booksRead} status={'read'} />
              ) : null}
              {booksPlan?.length > 0 && (
                <PlanToReadList library={booksPlan} status={'plan'} />
              )}
            </>
            <LibraryButton />
          </>
        ) : (
          <>
            <Media
              query="(min-width: 768px)"
              render={() => (
                <div className={s['library-flex-container']}>
                  <div className={s['library-wrapper']}>
                    <div className={s['library-firstStep']}>
                      <h4 className={s['library-stepsTitle']}>Крок 1.</h4>
                      <div className={s['library-flex-wrapper']}>
                        <div className={s['library-flex-cont']}>
                          <svg
                            className={s['library-main-icon']}
                            width="22"
                            height="18"
                          >
                            <use href={sprite + '#library-icon'} />
                          </svg>
                          <h5 className={s['library-stepsSuptitle']}>
                            Створіть особисту бібліотеку
                          </h5>
                        </div>
                        <div className={s['library-flex-wrapper']}>
                          <div className={s['library-flex-cont']}>
                            <svg
                              className={s['library-arrow-icon']}
                              width="10"
                              height="12"
                            >
                              <use href={sprite + '#library-arrow'} />
                            </svg>
                            <p className={s['library-stepsParagrath']}>
                              Додайте до неї книжки, які маєте намір прочитати.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={s['library-secondStep']}>
                      <h4 className={s['library-stepsTitle']}>Крок 2.</h4>
                      <div className={s['library-flex-wrapper']}>
                        <div className={s['library-flex-cont']}>
                          <svg
                            className={s['library-main-icon']}
                            width="22"
                            height="18"
                          >
                            <use href={sprite + '#library-flag'} />
                          </svg>
                          <h5 className={s['library-stepsSuptitle']}>
                            Сформуйте своє перше тренування
                          </h5>
                        </div>
                        <div className={s['library-flex-wrapper']}>
                          <div className={s['library-flex-cont']}>
                            <svg
                              className={s['library-arrow-icon']}
                              width="10"
                              height="12"
                            >
                              <use href={sprite + '#library-arrow'} />
                            </svg>
                            <p className={s['library-stepsParagrath']}>
                              Визначте ціль, оберіть період, розпочинайте
                              тренування.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            {showModal && (
              <Media
                query="(max-width: 767px)"
                render={() => <ModalLibrary onClose={toggleModal} />}
              />
            )}
          </>
        )}
      </>
      {isFetching && Loading.circle()}
    </div>
  );
};

export default Library;
