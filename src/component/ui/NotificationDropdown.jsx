import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: 320px;
    background-color: ${props => props.theme.cardBody};
    border: 1px solid ${props => props.theme.border};
    border-radius: 12px;
    box-shadow: ${props => props.theme.body === '#121212' ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.08)'};
    overflow: hidden;
    z-index: 1010;
    animation: fadeIn 0.15s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const DropdownHeader = styled.div`
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.text};
`;

const NotificationList = styled.div`
    max-height: 280px;
    overflow-y: auto;
`;

const NotificationItem = styled.div`
    padding: 12px 16px;
    font-size: 13px;
    color: ${props => props.theme.text};
    border-bottom: 1px solid ${props => props.theme.border};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.theme.body};
    }

    &:last-child {
        border-bottom: none;
    }
`;

const EmptyNotice = styled.div`
    padding: 32px 16px;
    text-align: center;
    font-size: 13px;
    color: ${props => props.theme.secondaryText};
`;

function NotificationDropdown({ onClose }) {
    const dropdownRef = useRef(null);

    // 외부 영역 클릭 시 드롭다운이 자동으로 닫히는 클로저 이벤트 바인딩
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        // 마우스 다운 이벤트를 캡처링 단계에서 캐치하여 처리하도록 설정
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [onClose]);

    // 임시 더미 데이터 (추후 DB 연동용)
    const dummyNotifications = [
        { id: 1, message: "🎉 피카츄님이 당신의 글을 좋아합니다." },
        { id: 2, message: "💬 파이리님이 새 댓글을 남겼습니다: '꿀팁 얻어갑니다!!'" }
    ];

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownHeader>최근 알림</DropdownHeader>
            <NotificationList>
                {dummyNotifications.length > 0 ? (
                    dummyNotifications.map(item => (
                        <NotificationItem key={item.id}>
                            {item.message}
                        </NotificationItem>
                    ))
                ) : (
                    <EmptyNotice>새로운 알림이 없습니다.</EmptyNotice>
                )}
            </NotificationList>
        </DropdownWrapper>
    );
}

export default NotificationDropdown;