package usecase

import (
	"context"
	"server/domain"
	"server/internal/util"
	"time"
)

type loginUsecase struct {
	userRepository domain.UserRepository
	contextTimeout time.Duration
}

func NewLoginUsecase(userRepository domain.UserRepository, timeout time.Duration) domain.LoginUsecase {
	return &loginUsecase{
		userRepository: userRepository,
		contextTimeout: timeout,
	}
}

func (l *loginUsecase) GetUserByEmail(c context.Context, email string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, l.contextTimeout)
	defer cancel()
	return l.userRepository.GetByEmail(ctx, email)
}

func (l *loginUsecase) CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	return util.CreateAccessToken(user, secret, expiry)
}

func (l *loginUsecase) CreateRefreshToken(user *domain.User, secret string, expiry int) (refreshToken string, err error) {
	return util.CreateRefreshToken(user, secret, expiry)
}

func (l *loginUsecase) GetUserByID(c context.Context, id string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, l.contextTimeout)
	defer cancel()
	return l.userRepository.GetByID(ctx, id)
}
