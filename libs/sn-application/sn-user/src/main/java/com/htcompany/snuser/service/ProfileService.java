package com.htcompany.snuser.service;

import com.htcompany.sndomain.user.Address;
import com.htcompany.sndomain.user.Birthday;
import com.htcompany.sndomain.user.PhoneNumber;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.snuser.graphql.input.AddressInput;
import com.htcompany.snuser.graphql.input.BirthdayInput;
import com.htcompany.snuser.graphql.input.PhoneInput;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.ProfileMapper;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    private final UserRepository userRepository;

    private final ProfileMapper mapper;

    public ProfileService(
        ProfileRepository profileRepository,
        UserRepository userRepository,
        ProfileMapper mapper) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Transactional
    public Mono<Profile> getProfileForUser(String userId, String currentId) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(profile -> {
                if (userId.equals(currentId)) {
                    return Mono.just(profile);
                } else {
                    if (profile.getAddress() != null &&
                        profile.getAddress().getMode().isPrivateMode()) {
                        profile.changeAddress(null);
                    }
                    if (profile.getPhoneNumber() != null &&
                        profile.getPhoneNumber().getMode().isPrivateMode()) {
                        profile.changePhone(null);
                    }
                    if (profile.getBirthday() != null &&
                        profile.getBirthday().getMode().isPrivateMode()) {
                        profile.changeBirthday(null);
                    }

                    return userRepository.findFriendByUser(userId, currentId)
                        .transform(userMono -> Mono.fromCompletionStage(userMono.toFuture().thenApply(u -> {
                            if (u == null) {
                                if (profile.getAddress() != null &&
                                    profile.getAddress().getMode().isFriendMode()) {
                                    profile.changeAddress(null);
                                }
                                if (profile.getPhoneNumber() != null &&
                                    profile.getPhoneNumber().getMode().isFriendMode()) {
                                    profile.changePhone(null);
                                }
                                if (profile.getBirthday() != null &&
                                    profile.getBirthday().getMode().isFriendMode()) {
                                    profile.changeBirthday(null);
                                }
                            }

                            return profile;
                        })));
                }
            })
            .switchIfEmpty(
                userRepository.findById(userId)
                    .flatMap(user ->
                                 profileRepository.save(Profile.of(
                                     null, null, new Date(), null,
                                     null, null, user)
                                 )
                    )
            );
    }

    public Mono<Profile> editAddressForUser(String userId, AddressInput addressInput) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    Address address = mapper.addressInputToAddress(addressInput);
                    profile.changeAddress(address);

                    return profileRepository.save(profile);
                }));
    }

    public Mono<Profile> editBirthdayForUser(String userId, BirthdayInput birthdayInput) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    Birthday birthday = mapper.birthdayInputToBirthday(birthdayInput);
                    profile.changeBirthday(birthday);

                    return profileRepository.save(profile);
                }));
    }

    public Mono<Profile> editPhoneForUser(String userId, PhoneInput phoneInput) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    PhoneNumber phoneNumber = mapper.phoneInputToPhone(phoneInput);
                    profile.changePhone(phoneNumber);

                    return profileRepository.save(profile);
                }));
    }

    public Mono<Profile> editGenderForUser(String userId, String gender) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    profile.changeGender(gender);

                    return profileRepository.save(profile);
                }));
    }

    public Mono<Profile> editBioForUser(String userId, String bio) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    profile.changeBio(bio);

                    return profileRepository.save(profile);
                }));
    }

    public Mono<Profile> editInterestsForUser(String userId, List<String> interests) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(p -> profileRepository.findById(p.getId())
                .flatMap(profile -> {
                    Set<String> interestsToAdd = new HashSet<>(interests);
                    profile.addInterests(interestsToAdd);

                    return profileRepository.save(profile);
                }));
    }
}
